import {UserEntity} from "../../entities/user_entity";
import {UserRepository} from "../../repositories/user_repository";
import {left, right} from "either-ts";
import {GetUserByIdUsecase, GetUserByIdUsecaseParams} from "./get_user_by_id";
import {ServerFailure} from "../../../core/failures/failures";

describe('get user by id usecase', function () {
    const userExample = new UserEntity({
       username: "anzell",
        id: "exampleId",
        email: "test@email.com"
    });

    it('should return a valid user if call to repository is success', async function () {
        const mockRepository: UserRepository = {
          getUserById: jest.fn().mockReturnValue(right(userExample))
        };
        const usecase = new GetUserByIdUsecase(mockRepository);
        const result = await usecase.handle(new GetUserByIdUsecaseParams({id: "exampleId"}));
        expect(result).toStrictEqual(right(userExample));
    });

    it('should return left ServerFailure if a error ocurred in repository', async function () {
        const mockRepository: UserRepository = {
            getUserById: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const usecase = new GetUserByIdUsecase(mockRepository);
        const result = await usecase.handle(new GetUserByIdUsecaseParams({id: "exampleId"}));
        expect(result).toStrictEqual(left(new ServerFailure()));
    });
});