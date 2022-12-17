import create from 'zustand'

const useAuth = create((set) => ({
    auth: null,
    setAuth: (auth) => set((state) => ({ auth }))
}))

export default useAuth