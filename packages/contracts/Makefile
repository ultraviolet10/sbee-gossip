# include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

# Set CONFIG to "LOCAL" by default. Other valid values: "TEST" or "MAIN".
CONFIG?=LOCAL
export CONFIG

build:
	forge build
.PHONY: build

test:
	forge test -vv
.PHONY: test

testv:
	forge test -vvvv
.PHONY: testv

test-gas:
	forge test --gas-report
.PHONY: test-gas

watch:
	forge test --watch src/
.PHONY: watch

test-fork:
	forge test --gas-report --fork-url ${ETH_NODE}
.PHONY: test-fork

format:
	forge fmt src/*.sol src/test/*.sol src/deploy/*.sol src/libraries/*.sol
.PHONY: format

anvil:
	anvil --chain-id 1337
.PHONY: anvil

deploy: build
	@forge script script/Gossip.s.sol:GossipScript \
		--fork-url $(RPC_$(CONFIG)) \
		--private-key $(PRIVATE_KEY_$(CONFIG)) \
		--broadcast \
		--non-interactive \
		| grep "address " > out/deployment.txt
	@cat out/deployment.txt
	@node helper/extract_contract_addresses_abis.js \
		out/deployment.txt \
		out/abis.json \
		> out/deployment.json
	@cd ../webapp && pnpm wagmi generate
.PHONY: deploy