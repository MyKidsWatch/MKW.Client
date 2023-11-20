import { Selector } from "@ngxs/store";
import { UserState, UserStateModel } from "./user.state";
import { ChildInformation } from "./user.model";
import { ChildrenCard } from "../../models/children-card.model";
import { TranslateService } from "@ngx-translate/core";
import { ContentReviewCard } from "../../models/content-review-card.model";


export class UserSelectors {

    @Selector([UserState])
    static getUser(state: UserStateModel) {
        return state.user;
    }

    @Selector([UserState])
    static getTokenInfo(state: UserStateModel) {
        return state.token;
    }

    @Selector([UserState])
    static getUserCoins(state: UserStateModel) {
        return state.user?.coinCount;
    }

    @Selector([UserState])
    static getUserAdminInformation(state: UserStateModel) {
        if (!!state && !!state.user && state.user.isAdmin != undefined)
            return state.user.isAdmin;

        return false;
    }


    @Selector([UserState])
    static getUserChildren(state: UserStateModel) {
        return state.user?.childrenInformation;
    }

    @Selector([UserState])
    static getUserChildrenCard(state: UserStateModel) {
        return (translateService: TranslateService) => {

            let childrenCard: ChildrenCard[] = [];
            state.user?.childrenInformation.forEach(child => {
                childrenCard.push({
                    ageRange: this.getAgeRangeString(child.ageRangeId, translateService),
                    id: child.childId,
                    gender: this.getGenderString(child.genderId) || '',
                    genderId: child.genderId,
                    ageRangeId: child.ageRangeId,
                    style: this.getGenderString(child.childId) || 'unassigned'
                })
            });

            return childrenCard;
        }
    }

    @Selector([UserState])
    static getUserUniqueChildren(state: UserStateModel) {
        let filteredChildrenArray: ChildInformation[] = [];
        let children = state.user?.childrenInformation;

        children?.forEach(child => {
            let duplicateChild = filteredChildrenArray.find(el => (el.ageRangeId == child.ageRangeId && el.genderId == child.genderId));

            if (!duplicateChild)
                filteredChildrenArray.push({ ageRangeId: child.ageRangeId, genderId: child.genderId, childId: child.childId })
        })

        return filteredChildrenArray;
    }


    @Selector([UserState])
    static getUserUniqueChildrenCards(state: UserStateModel) {
        return (translateService: TranslateService) => {
            let filteredChildrenArray = this.getUserUniqueChildren(state);

            let childrenCard: ChildrenCard[] = [];
            filteredChildrenArray.forEach(child => {
                childrenCard.push({
                    ageRange: this.getAgeRangeString(child.ageRangeId, translateService),
                    id: child.childId,
                    genderId: child.genderId,
                    ageRangeId: child.ageRangeId,
                    gender: this.getGenderString(child.genderId) || '',
                    style: this.getGenderString(child.childId) || 'unassigned'
                })
            });

            return childrenCard;
        }
    }

    @Selector([UserState])
    static getUserReviews(state: UserStateModel) {
        return state.user?.userReviews;
    }

    @Selector([UserState])
    static getUserReviewsContentCard(state: UserStateModel): ContentReviewCard[] {
        let contentReviewCards: ContentReviewCard[] = [];

        state.user?.userReviews.forEach(userReview => {

            let contentReviewCard: ContentReviewCard = {
                reviewId: userReview.reviewDetails.id,
                reviewTitle: userReview.reviewDetails.title,
                reviewCommentCount: userReview.commentCount,
                reviewAwardInformation: {
                    reviewBronzeAwardCount: userReview.reviewAwards.bronzeAwards,
                    reviewSilverAwardCount: userReview.reviewAwards.silverAwards,
                    reviewGoldAwardCount: userReview.reviewAwards.goldenAwards
                },
                reviewContentInformation: {
                    contentTitle: userReview.reviewContent.title!,
                    contentPosterPath: this.basePicturePathFromPlatformId(userReview.reviewContent.platformId!) + userReview.reviewContent.picturePath
                },
                reviewerInformation: {
                    reviewerId: userReview.reviewOwner.id,
                    reviewerName: userReview.reviewOwner.userName,
                    reviewerPicturePath: userReview.reviewOwner.profilePictureUrl!
                },
                reviewPublishDate: userReview.reviewDetails.creationDate!,
                platformId: userReview.reviewContent.platformId,
                reviewBody: userReview.reviewDetails.description,
                reviewRating: userReview.reviewDetails.rating


            }
            console.log(contentReviewCard.reviewContentInformation.contentPosterPath)
            contentReviewCards.push(contentReviewCard);

        })

        return contentReviewCards;
    }

    static getGenderString(genderNumber?: number): string | undefined {
        let gender;

        switch (genderNumber) {
            case 1:
                gender = 'boy'
                break;
            case 2:
                gender = 'girl'
                break;
            default:
                gender = 'child'
                break;
        }

        return gender;
    }

    private static basePicturePathFromPlatformId(platformId: number) {
        console.log(platformId)
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

    static getAgeRangeString(ageRangeId?: number, translateService?: TranslateService) {
        let ageRangeString = '';
        switch (ageRangeId) {
            case 1:
                ageRangeString = '0 ' + translateService?.instant('to') + ' 2 ' + translateService?.instant('profile.yearsOld')
                break;
            case 2:
                ageRangeString = '3 ' + translateService?.instant('to') + ' 5 ' + translateService?.instant('profile.yearsOld')
                break;
            case 3:
                ageRangeString = '6 ' + translateService?.instant('to') + ' 8 ' + translateService?.instant('profile.yearsOld')
                break;
            case 4:
                ageRangeString = '9 ' + translateService?.instant('to') + ' 11 ' + translateService?.instant('profile.yearsOld')
                break;
            case 5:
                ageRangeString = '12 ' + translateService?.instant('to') + ' 14 ' + translateService?.instant('profile.yearsOld')
                break;
            case 6:
                ageRangeString = '15 ' + translateService?.instant('to') + ' 17 ' + translateService?.instant('profile.yearsOld')
                break;
        }

        return ageRangeString;

    }

    static getAgeRangeStringSimplified(ageRangeId?: number, translateService?: TranslateService) {
        let ageRangeString = '';
        switch (ageRangeId) {
            case 1:
                ageRangeString = '0 - 2 '
                break;
            case 2:
                ageRangeString = '3 - 5 '
                break;
            case 3:
                ageRangeString = '6 - 8 '
                break;
            case 4:
                ageRangeString = '9 - 11 '
                break;
            case 5:
                ageRangeString = '12 - 14 '
                break;
            case 6:
                ageRangeString = '15 - 17 '
                break;
        }

        return ageRangeString;

    }

}