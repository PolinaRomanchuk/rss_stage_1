export interface NewsArticlesResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
}

export interface NewsArticleSource {
    id: string | null;
    name: string;
}

export interface NewsArticle {
    source: NewsArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

export interface NewsSourcesResponse {
    status: string;
    sources: NewsSource[];
}

export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
