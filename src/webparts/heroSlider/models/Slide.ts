export interface Slide{
    id: number;
    title: string;
    description?: string;
    categories: string;
    imageUrl: string;
    ctaButton: CTAButton
}

export type CTAButton = {
    text: string;
    url: string;
}