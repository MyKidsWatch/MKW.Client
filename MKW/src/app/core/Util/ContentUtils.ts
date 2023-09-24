import { ContentCard } from "src/app/shared/models/content-card.model";
import { Content, ContentListItemDTO, ReviewDetailsDto } from "../proxies/mkw-api.proxy";
import { time } from "console";
import { title } from "process";
import { ContentReviewComment, ContentReviewPage } from "src/app/modules/content/models/content-review-page.model";
import { ContentReviewCard } from "src/app/shared/models/content-review-card.model";
export class ContentUtils {

  private static restrictedTerms = ['sex', 'porn', 'vagina', 'penis', 'anus', 'blowjob'];

  private static textContainsBlackListedTerms(text: string): boolean {
    return this.restrictedTerms.some(term => text.toLowerCase().includes(term.toLowerCase()));
  }

  private static picturePathFromPlatformId(platformId: number)
  {
      let picturePath = ''
      switch(platformId)
      {
        case 1:
          picturePath = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'
          break;
        case 2:
          picturePath = ''
          break; 
      }

      return picturePath;
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

  static ContentDTOResponseToContentCard(content: ContentListItemDTO) : ContentCard | null
  {

      if(!content)
        return null;

      let contentCard: ContentCard = {
        title: content.name!,
        releaseDate: new Date(content.releaseDate!),
        averageRating: Math.round(content.averageRating! * 5) / 10,
        contentType: 'Movie',
        description: content.description!,
        genre: content.tags?.map((x: any) => x.name),
        id: content.id,
        picturePath: content.imageUrl ? this.picturePathFromPlatformId(content.platformId!) + content.imageUrl : undefined
      }

      return contentCard;
  }


  static ContentReviewToPage(reviewDTO: ReviewDetailsDto) : ContentReviewPage | null
  {
    console.log(reviewDTO)

      let contentReviewPage: ContentReviewPage = {
        reviewId: reviewDTO.id!,
        reviewTitle: reviewDTO.title!,
        reviewDescription: reviewDTO.text!,
        reviewAuthor: {
          userName: reviewDTO.person!.name!,
          profilePictureUrl: "https://i.pinimg.com/736x/b4/88/75/b48875b97a4819d9b44dbd9469f96445.jpg"
        },
        reviewedContentInformation: {
          title: reviewDTO!.content!.name!,
          picturePath: reviewDTO!.content!.imageUrl ? 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + reviewDTO!.content!.imageUrl : undefined,
          contentId: reviewDTO!.content!.id!,
          platformId: 0
        },
        reviewRating: reviewDTO!.stars,
        reviewComments: [],
        reviewCreationDate: reviewDTO.createDate!
      }

      reviewDTO.comments?.forEach(comment => {
          let reviewComment: ContentReviewComment = {
            commentId: comment.id!,
            commentText: comment.text!,
            commentAuthor: {
              userName: comment.person!.username!,
              profilePictureUrl: 'assets/icon/default.jpg'
            } ,
            commentResponses: []          
          };

          contentReviewPage.reviewComments.push(reviewComment);
      });

      console.log(contentReviewPage)
      return contentReviewPage;
  }

  static relevantReviewToContentReviewCard(relevantReview: ReviewDetailsDto) : ContentReviewCard | null
  {
    if(!relevantReview)
      return null;

    let contentReviewCard: ContentReviewCard = {
      reviewId: relevantReview.id,
      reviewBody: relevantReview.text,
      reviewPublishDate: relevantReview.createDate!,
      reviewerInformation: {
        reviewerId: relevantReview.person!.id!,
        reviewerName: relevantReview.person!.name!,
        reviewerPicturePath: "assets/icon/default.jpg"
      },
      reviewRating: relevantReview.stars,
      reviewTitle: relevantReview.title,
      reviewAwardInformation: {
        reviewBronzeAwardCount: relevantReview.bronzeAwards ? relevantReview.bronzeAwards : 0,
        reviewGoldAwardCount: relevantReview.goldenAwards ? relevantReview.goldenAwards : 0, 
        reviewSilverAwardCount: relevantReview.silverAwards ? relevantReview.silverAwards : 0
      },
      reviewCommentCount: relevantReview.commentsQuantity ? relevantReview.commentsQuantity : 0,
      reviewContentInformation: {
        contentPosterPath: relevantReview.content?.imageUrl ? 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + relevantReview.content?.imageUrl : undefined,
        contentTitle: relevantReview.content?.name!
      }
    };

    return contentReviewCard;
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