import { ContentCard } from "src/app/shared/models/content-card.model";
import { ContentDetailsDTO, ContentListItemDTO, ReviewDetailsDto } from "../proxies/mkw-api.proxy";
import { ContentReviewCard } from "src/app/shared/models/content-review-card.model";

export class ContentUtils {
  private static restrictedTerms = ['sex', 'porn', 'vagina', 'penis', 'anus', 'blowjob'];

  private static textContainsBlackListedTerms(text: string): boolean {
    return this.restrictedTerms.some(term => text.toLowerCase().includes(term.toLowerCase()));
  }

  static basePicturePathFromPlatformId(platformId: number) {
    let picturePath = ''
    switch (platformId) {
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
    if (this.textContainsBlackListedTerms(tmdbResponse.title) || this.textContainsBlackListedTerms(tmdbResponse.overview))

      return null;

    const contentCard: ContentCard = {
      title: tmdbResponse.title,
      releaseDate: new Date(tmdbResponse.release_date),
      averageRating: Math.round(tmdbResponse.vote_average * 5) / 10,
      description: tmdbResponse.overview,
      genre: tmdbResponse.genre_ids.map((x: number) => this.TMDBGenreToText(x)),
      contentId: 0,
      externalContentId: tmdbResponse.id,
      platformId: 1,
      platformName: this.getPlatformString(1),
      picturePath: tmdbResponse.poster_path ? 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + tmdbResponse.poster_path : undefined
    }

    return contentCard;

  }

  static algorithmToContentCard(tmdbResponse: any): ContentCard | null {
    if (!tmdbResponse)
      return null;

    const contentCard: ContentCard = {
      title: tmdbResponse.title,
      releaseDate: new Date(tmdbResponse.release_date),
      averageRating: Math.round(tmdbResponse.vote_average * 5) / 10,
      description: tmdbResponse.overview,
      genre: tmdbResponse.genres.map((x: any) => x.name),
      contentId: 0,
      externalContentId: tmdbResponse.id,
      platformId: 1,
      platformName: this.getPlatformString(1),
      picturePath: tmdbResponse.poster_path ? 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + tmdbResponse.poster_path : undefined
    }

    return contentCard;
  }

  static ContentDTOResponseToContentCard(content: ContentListItemDTO): ContentCard | null {

    if (!content)
      return null;

    const contentCard: ContentCard = {
      title: content.name!,
      releaseDate: new Date(content.releaseDate!),
      averageRating: Math.round(content.averageRating! * 5) / 10,
      description: content.description!,
      genre: content.tags?.map((x: any) => x.name),
      platformId: content.platformId!,
      platformName: this.getPlatformString(content.platformId!),
      externalContentId: content.externalId!,
      contentId: content.id!,
      picturePath: content.imageUrl ? this.basePicturePathFromPlatformId(content.platformId!) + content.imageUrl : undefined
    }

    return contentCard;
  }

  static ContentDetailsDTOToContentCard(content: ContentDetailsDTO): ContentCard | null {
    if (!content)
      return null;

    let contentCard: ContentCard = {
      title: content.name!,
      releaseDate: new Date(content.releaseDate!),
      averageRating: Math.round(content.averageRating! * 5) / 10,
      description: content.description!,
      genre: content.tags || [],
      platformId: content.platformId!,
      platformName: this.getPlatformString(content.platformId!),
      externalContentId: content.externalId!,
      contentId: content.id,
      picturePath: content.imageUrl ? this.basePicturePathFromPlatformId(content.platformId!) + content.imageUrl : undefined,
      platformIconPath: this.getPlatformIcon(content.platformId!)
    }

    return contentCard;
  }

  static relevantReviewToContentReviewCard(relevantReview: ReviewDetailsDto): ContentReviewCard | null {
    if (!relevantReview)
      return null;

    const contentReviewCard: ContentReviewCard = {
      reviewId: relevantReview.id,
      reviewBody: relevantReview.text,
      reviewPublishDate: relevantReview.createDate!,
      reviewerInformation: {
        reviewerId: relevantReview.person!.id!,
        reviewerName: relevantReview.person!.username!,
        reviewerPicturePath: relevantReview.person!.imageURL!
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
        contentPosterPath: relevantReview.content?.imageUrl 
          ? this.basePicturePathFromPlatformId(relevantReview.content?.platformId as number) + relevantReview.content?.imageUrl 
          : undefined,
        contentTitle: relevantReview.content?.name!
      },
      platformId: relevantReview.content?.platformId!,
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

  static getPlatformString(platformId: number) {
    if (platformId == 1)
      return 'movie';

    if (platformId == 2)
      return 'channel';

    return '';
  }

  static getPlatformIcon(platformId: number) {
    const basePath = 'assets/icon/';

    if (platformId == 1)
      return basePath + 'movie.svg';

    if (platformId == 2)
      return basePath + 'channel.svg';

    return '';
  }
}