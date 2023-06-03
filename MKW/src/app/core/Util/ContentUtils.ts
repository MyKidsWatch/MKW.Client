import { ContentCard } from "src/app/shared/models/content-card.model";
import { Content } from "../proxies/mkw-api.proxy";

export class ContentUtils {
    static TMDBToContentCard(tmdbResponse: any) : ContentCard
    {
        console.log(tmdbResponse);
        let contentCard: ContentCard = {
            title: tmdbResponse.title,
            releaseDate: new Date(tmdbResponse.release_date),
            averageRating: Math.round(tmdbResponse.vote_average * 10)/10,
            contentType: 'Movie',
            description: tmdbResponse.overview,
            genre: tmdbResponse.genre_ids.map((x: number) => this.TMDBGenreToText(x)),
            id: tmdbResponse.id,
            picturePath: tmdbResponse.poster_path ? 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + tmdbResponse.poster_path : undefined
        }

        return contentCard;

    }

    static algorithmToContentCard(tmdbResponse: any) : ContentCard
    {
      let contentCard: ContentCard = {
        title: tmdbResponse.title,
        releaseDate: new Date(tmdbResponse.release_date),
        averageRating: Math.round(tmdbResponse.vote_average * 10)/10,
        contentType: 'Movie',
        description: tmdbResponse.overview,
        genre: tmdbResponse.genres.map((x: any) => x.name),
        id: tmdbResponse.id,
        picturePath: tmdbResponse.poster_path ? 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + tmdbResponse.poster_path : undefined
    }

    return contentCard;
    }

    static TMDBGenreToText(genreId: number): string {
        switch (genreId) {
          case 28:
            return 'Action';
          case 12:
            return 'Adventure';
          case 16:
            return 'Animation';
          case 35:
            return 'Comedy';
          case 80:
            return 'Crime';
          case 99:
            return 'Documentary';
          case 18:
            return 'Drama';
          case 10751:
            return 'Family';
          case 14:
            return 'Fantasy';
          case 36:
            return 'History';
          case 27:
            return 'Horror';
          case 10402:
            return 'Music';
          case 9648:
            return 'Mystery';
          case 10749:
            return 'Romance';
          case 878:
            return 'Science Fiction';
          case 10770:
            return 'TV Movie';
          case 53:
            return 'Thriller';
          case 10752:
            return 'War';
          case 37:
            return 'Western';
          default:
            return 'Unknown';
        }
      }
      

}