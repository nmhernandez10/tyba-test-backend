export interface RestaurantsApiResponse {
    summary: any;
    results: RestaurantApiObject[];
}

export interface RestaurantApiObject {
    type: string;
    id: string;
    score: number;
    dist: number;
    info: string;
    poi: any;
    dataSources: any;
    entryPoints: any;
    viewport: any;
    position: {
        lat: number;
        lon: number;
    };
    address: any;
}
