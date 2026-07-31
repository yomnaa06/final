<<<<<<< HEAD
=======
// lib/api.ts
/**
 * Centralized API client — all requests go through here.
 * The base URL comes from NEXT_PUBLIC_API_URL (default: http://localhost:3000).
 */
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b

 const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

 function getToken(): string | null {
   if (typeof window === 'undefined') return null
   return localStorage.getItem('token')
 }
 
 type RequestOptions = {
   method?: string
   body?: unknown
   auth?: boolean
 }
 
 async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
   const { method = 'GET', body, auth = true } = opts
 
   const headers: Record<string, string> = {
     'Content-Type': 'application/json',
   }
 
   if (auth) {
     const token = getToken()
     if (token) headers['Authorization'] = `Bearer ${token}`
   }
 
   let res: Response
   try {
     res = await fetch(`${BASE}${path}`, {
       method,
       headers,
       body: body != null ? JSON.stringify(body) : undefined,
     })
   } catch {
     throw new Error('Impossible de contacter le serveur. Vérifiez que le backend est démarré sur le port 3000.')
   }
 
<<<<<<< HEAD
   // parsing json
=======
   // Parse JSON safely — some endpoints return plain text on error
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
   let json: Record<string, unknown>
   try {
     json = await res.json()
   } catch {
     throw new Error(`Erreur serveur (${res.status}).`)
   }
 
   if (!res.ok) {
<<<<<<< HEAD
     // use backend message so user yefhem what went wrong
=======
     // Use the exact backend message so the user sees what really went wrong
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
     const msg =
       (json.message as string) ||
       (json.error as string) ||
       `Erreur ${res.status}.`
     throw new Error(msg)
   }
 
   return json as T
 }
 
<<<<<<< HEAD
 // authentification
=======
 // ─── Auth ────────────────────────────────────────────────────────────────────
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
 
 export type LoginPayload = {
   email: string
   password: string
   clientType?: 'INDIVIDUEL' | 'SOCIETE' | 'ADMIN'
 }
 
 export type RegisterIndividualPayload = {
   clientType: 'INDIVIDUEL'
   email: string
   password: string
   nom: string
   prenom: string
   telephone?: string
   adresse?: string
   codePostal?: string
   ville?: string
   brancheContact?: string
   produitsInterets?: string
 }
 
 export type RegisterCompanyPayload = {
   clientType: 'SOCIETE'
   email: string
   password: string
   nomSociete: string
   telephone?: string
   adresse?: string
   codePostal?: string
   ville?: string
   matriculeFiscal: string
   brancheContact?: string
   produitsInterets?: string
 }
 
 export type AuthResponse = {
   success: boolean
   data: {
     token: string
     user: UserProfile
   }
 }
 
 export type UserProfile = {
   id: number
   email: string
   role: 'CLIENT' | 'ADMIN'
<<<<<<< HEAD
   // client
=======
   // client fields
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
   clientType?: 'INDIVIDUEL' | 'SOCIETE'
   nom?: string
   prenom?: string
   telephone?: string
   adresse?: string
   codePostal?: string
   ville?: string
   matriculeFiscal?: string
   brancheContact?: string
   produitsInterets?: string
<<<<<<< HEAD
   // admin 
=======
   // admin fields
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
   username?: string
   dateCreation?: string
 }
 
 export const authApi = {
   login: (payload: LoginPayload) =>
     request<AuthResponse>('/api/auth/login', { method: 'POST', body: payload, auth: false }),
 
   register: (payload: RegisterIndividualPayload | RegisterCompanyPayload) =>
     request<AuthResponse>('/api/auth/register', { method: 'POST', body: payload, auth: false }),
 
   getProfile: () =>
     request<{ success: boolean; data: UserProfile }>('/api/auth/profile'),
 
   updateProfile: (data: Partial<UserProfile>) =>
     request<{ success: boolean; data: UserProfile }>('/api/auth/profile', {
       method: 'PUT',
       body: data,
     }),
 
   forgotPassword: (email: string) =>
     request<{ success: boolean; message: string }>('/api/auth/forgot-password', {
       method: 'POST',
       body: { email },
       auth: false,
     }),
 
   resetPassword: (token: string, password: string) =>
     request<{ success: boolean; message: string }>('/api/auth/reset-password', {
       method: 'POST',
       body: { token, password },
       auth: false,
     }),
 }
 
<<<<<<< HEAD
 // devis
=======
 // ─── Devis ───────────────────────────────────────────────────────────────────
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
 
 export type Devis = {
   id: number
   clientId: number
   brancheContact: string
   produitDesire: string
   description: string
   statut: 'EN_ATTENTE' | 'VALIDE' | 'REFUS'
   dateDemande: string
   dateTraitement?: string
   motifRefus?: string
   documentUrl?: string
   client?: { nom: string; telephone?: string; email?: string }
 }
 
 export const devisApi = {
   create: (data: { brancheContact: string; produitDesire: string; description: string }) =>
     request<{ success: boolean; data: Devis }>('/api/devis', { method: 'POST', body: data }),
 
   getMyDevis: () =>
     request<{ success: boolean; data: Devis[] }>('/api/devis/my'),
 
   getOne: (id: number) =>
     request<{ success: boolean; data: Devis }>(`/api/devis/${id}`),
 
   listAll: () =>
     request<{ success: boolean; data: Devis[] }>('/api/devis/admin'),
 
<<<<<<< HEAD
   // validation de pdf  w pdf envoie
=======
   /** Validate a devis with an optional PDF attachment — uses multipart/form-data */
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
   validateWithFile: async (id: number, file: File, description?: string): Promise<{ success: boolean; data: Devis }> => {
     const token = getToken()
     const formData = new FormData()
     formData.append('file', file)
     if (description?.trim()) formData.append('description', description.trim())
 
     let res: Response
     try {
       res = await fetch(`${BASE}/api/admin/devis/${id}/validate`, {
         method: 'PUT',
         headers: token ? { Authorization: `Bearer ${token}` } : {},
         body: formData,
       })
     } catch {
       throw new Error('Impossible de contacter le serveur.')
     }
 
     let json: Record<string, unknown>
     try { json = await res.json() } catch { throw new Error(`Erreur serveur (${res.status}).`) }
     if (!res.ok) throw new Error((json.message as string) || `Erreur ${res.status}.`)
     return json as { success: boolean; data: Devis }
   },
 
   refuse: (id: number, motifRefus: string) =>
     request<{ success: boolean; data: Devis }>(`/api/admin/devis/${id}/refuse`, {
       method: 'PUT',
       body: { motifRefus },
     }),
 }
 
<<<<<<< HEAD
 // reclamation
=======
 // ─── Reclamations ────────────────────────────────────────────────────────────
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
 
 export type Reclamation = {
   id: number
   clientId: number
   destinataire: string
   sujet: string
   description: string
   statut: 'EN_ATTENTE' | 'TRAITE'
   date: string
   reponseAdmin?: string
   client?: { nom: string; telephone?: string }
 }
 
 export const reclamationApi = {
   create: (data: { destinataire: string; sujet: string; description: string }) =>
     request<{ success: boolean; data: Reclamation }>('/api/reclamations', {
       method: 'POST',
       body: data,
     }),
 
   getMy: () =>
     request<{ success: boolean; data: Reclamation[] }>('/api/reclamations/my'),
 
   // Admin
   listAll: () =>
     request<{ success: boolean; data: Reclamation[] }>('/api/reclamations/admin'),
 
   listPending: () =>
     request<{ success: boolean; data: Reclamation[] }>('/api/reclamations/admin/pending'),
 
   process: (id: number, reponseAdmin: string) =>
     request<{ success: boolean; data: Reclamation }>(`/api/admin/reclamations/${id}/process`, {
       method: 'PUT',
       body: { reponseAdmin },
     }),
 }
 
 // ─── Admin ───────────────────────────────────────────────────────────────────
 
 export type DashboardStats = {
   totalClients: number
   devis: {
     total: number
     EN_ATTENTE: number
     VALIDE: number
     REFUS: number
   }
   reclamations: {
     total: number
     EN_ATTENTE: number
     EN_COURS: number
     TRAITE: number
   }
 }
 
 export type Client = {
   id: number
   clientType: 'INDIVIDUEL' | 'SOCIETE'
   nom: string
   prenom?: string
   telephone?: string
   adresse: string
   codePostal?: string
   ville?: string
   matriculeFiscal?: string
   brancheContact?: string
   produitsInterets?: string
   dateCreation: string
   user: { email: string; dateCreation: string }
 }
 
 export const adminApi = {
   getDashboard: () =>
     request<{
       success: boolean
       data: {
         stats: DashboardStats
         notifications: {
           pendingDevis: { count: number; items: Devis[] }
           pendingReclamations: { count: number; items: Reclamation[] }
           totalPending: number
         }
         lastUpdated: string
       }
     }>('/api/admin/dashboard'),
 
   getClients: () =>
     request<{ success: boolean; data: Client[] }>('/api/admin/clients'),
 
   getStats: () =>
     request<{ success: boolean; data: { stats: DashboardStats } }>('/api/admin/stats'),
 }
 
<<<<<<< HEAD
 // contact
=======
 // ─── NEW: Contact ────────────────────────────────────────────────────────────
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
 
 export type ContactPayload = {
   name: string
   email: string
   subject: string
   message: string
 }
 
 export const contactApi = {
   send: (data: ContactPayload) =>
     request<{ success: boolean; message: string }>('/api/contact', {
       method: 'POST',
       body: data,
<<<<<<< HEAD
       auth: false, // zeyed authentification
=======
       auth: false, // No auth needed for contact form
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
     }),
 }