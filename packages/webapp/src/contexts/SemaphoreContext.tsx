/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { decodeBytes32String, toBeHex } from "ethers"

import { SemaphoreEthers } from "@semaphore-protocol/data"

export type SemaphoreContextType = {
  _users: string[]
  _gossip: string[]
  refreshUsers: () => Promise<void>
  addUser: (user: string) => void
  refreshGossip: () => Promise<void>
  addGossip: (gossip: string) => void
}

const SemaphoreContext = createContext<SemaphoreContextType | null>(null)

interface ProviderProps {
  children: ReactNode
}

const ethereumNetwork =
  process.env.NEXT_PUBLIC_DEFAULT_NETWORK === "localhost"
    ? "http://127.0.0.1:8545"
    : process.env.NEXT_PUBLIC_DEFAULT_NETWORK

export const SemaphoreContextProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [_users, setUsers] = useState<string[]>([])
  const [_gossip, setGossip] = useState<string[]>([])

  const refreshUsers = useCallback(async (): Promise<void> => {
    const semaphore = new SemaphoreEthers(ethereumNetwork, {
      address: process.env.NEXT_PUBLIC_SEMAPHORE_CONTRACT_ADDRESS,
    })

    const members = await semaphore.getGroupMembers(
      process.env.NEXT_PUBLIC_GROUP_ID as string
    )

    setUsers(members.map((member) => member.toString()))
  }, [])

  const addUser = useCallback(
    (user: any) => {
      setUsers([..._users, user])
    },
    [_users]
  )

  const refreshGossip = useCallback(async (): Promise<void> => {
    const semaphore = new SemaphoreEthers(ethereumNetwork, {
      address: process.env.NEXT_PUBLIC_SEMAPHORE_CONTRACT_ADDRESS,
    })

    const proofs = await semaphore.getGroupValidatedProofs(
      process.env.NEXT_PUBLIC_GROUP_ID as string
    )

    setGossip(
      proofs.map(({ message }: any) =>
        decodeBytes32String(toBeHex(message, 32))
      )
    )
  }, [])

  const addGossip = useCallback(
    (gossip: string) => {
      setGossip([..._gossip, gossip])
    },
    [_gossip]
  )

  useEffect(() => {
    refreshUsers()
    refreshGossip()
  }, [refreshGossip, refreshUsers])

  return (
    <SemaphoreContext.Provider
      value={{
        _users,
        _gossip,
        refreshUsers,
        addUser,
        refreshGossip,
        addGossip,
      }}
    >
      {children}
    </SemaphoreContext.Provider>
  )
}

export const useSemaphoreContext = () => {
  const context = useContext(SemaphoreContext)
  if (context === null) {
    throw new Error(
      "SemaphoreContext must be used within a SemaphoreContextProvider"
    )
  }
  return context
}
