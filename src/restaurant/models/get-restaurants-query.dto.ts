import { IsLatitude, IsLongitude } from 'class-validator';

export class GetRestaurantsQueryDto {
    @IsLatitude()
    lat: string;

    @IsLongitude()
    lon: string;
}
