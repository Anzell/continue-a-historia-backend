import {UsecasesInjector} from "./usecases_injector";
import {ConvertersInjector} from "./converters_injector";
import {CreateRoomController} from "../presenters/room/create_room_controller";
import {SignUpController} from "../presenters/auth/signup_controller";
import {AuthGuard} from "../main/middlewares/auth_guard";
import {GetUserByIdUsecase} from "../domain/usecases/user/get_user_by_id";
import {TokenHelper} from "../core/helper/token_helper";
import {CoreInjector} from "./core_injector";
import {SignInController} from "../presenters/auth/signin_controller";
import {SignInUsecase, SignInUseCaseImpl} from "../domain/usecases/auth/sign_in";
import {RepositoriesInjector} from "./repositories_injector";
import {SignInConverter} from "../presenters/auth/converters/signin_converter";

export class ControllersInjectorFactory {
    public static async createRoomControllerFactory(): Promise<CreateRoomController>{
        const usecase = await UsecasesInjector.CreateRoomUsecaseFactory();
        const converter = await ConvertersInjector.gameRoomConverterFactory();
        return new CreateRoomController(usecase, converter);
    }

    public static async signUpControllerFactory(): Promise<SignUpController>{
        const usecase = await UsecasesInjector.signUpUsecaseFactory();
        const converter = await ConvertersInjector.signUpConverterFactory();
        return new SignUpController(usecase, converter);
    }

    public static async authGuardFactory(...authorized: string[]): Promise<AuthGuard> {
        const getUserByIdUsecase: GetUserByIdUsecase = await UsecasesInjector.getUserByIdUsecase();
        const tokenHelper: TokenHelper = await CoreInjector.tokenHelperFactory();
        return new AuthGuard({authorized, tokenHelper, getUserUsecase: getUserByIdUsecase});
    }

    public static async signInControllerFactory(): Promise<SignInController> {
        const usecase: SignInUsecase = new SignInUseCaseImpl(await RepositoriesInjector.authRepositoryFactory());
        const converter: SignInConverter = new SignInConverter();
        return new SignInController(usecase, converter);
    }
}