export interface Link {
    original_url: string,
    shortened_url?: string,
    createdAt: Date,
    expiresAt: Date,
    creator?: string
}