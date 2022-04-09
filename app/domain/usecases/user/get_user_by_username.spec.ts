import {UserEntity} from "../../entities/user_entity";
import {left, right} from "either-ts";
import {ServerFailure} from "../../../core/failures/failures";
import { GetUserByUsernameUsecase, GetUserByUsernameUsecaseParams } from "./get_user_by_username";

describe('get user by username usecase', function () {
    const userExample = new UserEntity({
       username: "anzell",
        id: "exampleId",
        email: "test@email.com"
    });

    it('should return a valid user if call to repository is success', async function () {
        const mockRepository: any = {
          getUserByUsername: jest.fn().mockReturnValue(right(userExample)),
            getUserPermissions: jest.fn()
        };
        const usecase = new GetUserByUsernameUsecase(mockRepository);
        const result = await usecase.handle(new GetUserByUsernameUsecaseParams({username: "anzell"}));
        expect(result).toStrictEqual(right(userExample));
    });

    it('should return left ServerFailure if a error ocurred in repository', async function () {
        const mockRepository: any = {
            getUserByUsername: jest.fn().mockReturnValue(left(new ServerFailure())),
            getUserPermissions: jest.fn()
        };
        const usecase = new GetUserByUsernameUsecase(mockRepository);
        const result = await usecase.handle(new GetUserByUsernameUsecaseParams({username: "anzell"}));
        expect(result).toStrictEqual(left(new ServerFailure()));
    });
});