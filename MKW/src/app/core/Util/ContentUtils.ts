import { ContentCard } from "src/app/shared/models/content-card.model";
import { Content } from "../proxies/mkw-api.proxy";
import { time } from "console";
import { title } from "process";
import { ContentReviewPage } from "src/app/modules/content/models/content-review-page.model";

export class ContentUtils {

  private static restrictedTerms = ['sex', 'porn', 'vagina', 'penis', 'anus', 'blowjob'];

  private static textContainsBlackListedTerms(text: string): boolean {
    return this.restrictedTerms.some(term => text.toLowerCase().includes(term.toLowerCase()));
  }

  static TMDBToContentCard(tmdbResponse: any): ContentCard | null {

    if(this.textContainsBlackListedTerms(tmdbResponse.title) || this.textContainsBlackListedTerms(tmdbResponse.overview))
      return null;

    let contentCard: ContentCard = {
      title: tmdbResponse.title,
      releaseDate: new Date(tmdbResponse.release_date),
      averageRating: Math.round(tmdbResponse.vote_average * 5) / 10,
      contentType: 'Movie',
      description: tmdbResponse.overview,
      genre: tmdbResponse.genre_ids.map((x: number) => this.TMDBGenreToText(x)),
      id: tmdbResponse.id,
      picturePath: tmdbResponse.poster_path ? 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + tmdbResponse.poster_path : undefined
    }

    return contentCard;

  }

  static algorithmToContentCard(tmdbResponse: any): ContentCard | null {
    if (!tmdbResponse)
      return null;

    let contentCard: ContentCard = {
      title: tmdbResponse.title,
      releaseDate: new Date(tmdbResponse.release_date),
      averageRating: Math.round(tmdbResponse.vote_average * 5) / 10,
      contentType: 'Movie',
      description: tmdbResponse.overview,
      genre: tmdbResponse.genres.map((x: any) => x.name),
      id: tmdbResponse.id,
      picturePath: tmdbResponse.poster_path ? 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + tmdbResponse.poster_path : undefined
    }

    return contentCard;
  }

  static ContentReviewToPage(tmdbResponse: any) : ContentReviewPage | null
  {

      let contentReviewPage: ContentReviewPage = {
        reviewId: 1,
        reviewTitle: "Bom filme",
        reviewDescription: "Filme excelente, direção artistica impecável, todos os personagens em suas melhores versões. Shinji herói.",
        reviewAuthor: {
          userName: "Mommy Makima",
          profilePictureUrl: "https://i.pinimg.com/736x/b4/88/75/b48875b97a4819d9b44dbd9469f96445.jpg"
        },
        reviewedContentInformation: {
          title: tmdbResponse.title,
          picturePath: tmdbResponse.poster_path ? 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + tmdbResponse.poster_path : undefined,
          contentId: tmdbResponse.id,
          platformId: 0
        },
        reviewRating: 5,
        reviewComments: [
          {

            commentId: 1,
            commentText: "Como o legítimo herdeiro do Trono de Ferro, Stannis Baratheon não recuará. A justiça guia meu caminho, e a lei é minha força. Passo esta mensagem a 10 leais aliados para que a verdade seja ouvida e o reino retorne à ordem. ",
            commentAuthor: {
              userName: "Stannis Baratheon",
              profilePictureUrl: "https://static.tvtropes.org/pmwiki/pub/images/got_stannis_baratheon.png"
            } ,
            commentResponses: [
              {
                commentId: 2,
                commentText: "Concordo",
                commentAuthor: {
                  userName: "Sir Davos",
                  profilePictureUrl: "https://i.redd.it/3gc3jwh29rl21.jpg"
                },
                commentResponses: []
              },
              {
                commentId: 2,
                commentText: "kys",
                commentAuthor: {
                  userName: "Power",
                  profilePictureUrl: "https://static.wikia.nocookie.net/d21d33f7-5adf-475d-b41e-0196825b1e56/scale-to-width/755"
                },
                commentResponses: []
              }
            ]
          },
          {
            commentId: 4,
            commentText: "Não entendi o final",
            commentAuthor: {
              userName: "Denji",
              profilePictureUrl: "https://wallpapers-clan.com/wp-content/uploads/2023/01/chainsaw-man-denji-pfp-5.jpg"
            } ,
            commentResponses: []
          }
        ],
        reviewCreationDate: new Date(2022, 5, 23)
      }
      return contentReviewPage;
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