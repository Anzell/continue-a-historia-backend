import {SocketController} from "../../main/protocols/controller";
import {
    PlayerEnterInRoomUsecase,
    PlayerEnterInRoomUsecaseParams
} from "../../domain/usecases/room/player_enter_in_room";
import {
    PlayerEnterInRoomConverter,
    PlayerEnterInRoomConverterParams
} from "./converters/player_enter_in_room_converter";
import {Failure, ValidationFailure} from "../../core/failures/failures";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {CustomMessage} from "../../main/protocols/custom_message";
import {TypeSocketMessages} from "../../core/constants/socket/type_messages";

export class PlayerEnterInRoomController implements SocketController {

    constructor (private readonly insertPlayerInRoomUsecase: PlayerEnterInRoomUsecase, private readonly insertPlayerConverter: PlayerEnterInRoomConverter) {}

    async handle (request: any): Promise<CustomMessage> {
        let serverResponse = new CustomMessage({
            type: TypeSocketMessages.error,
            content: {}
        });
        await new Promise((resolve) => {
            const converter = this.insertPlayerConverter.handle(new PlayerEnterInRoomConverterParams({
                userId: request['userId'],
                roomId: request['roomId'],
            }));
            converter.map(async (data) => {
                const result = await this.insertPlayerInRoomUsecase.handle(new PlayerEnterInRoomUsecaseParams({
                    roomId: data.roomId,
                    userId: data.userId,
                }));
                result.map((_: any) => {
                    serverResponse = new CustomMessage({
                        type: TypeSocketMessages.playerEnterInRoom,
                        content: {}
                    });
                    resolve(true);
                });
                result.leftMap((failure: Failure)=>{
                    serverResponse = new CustomMessage({
                        type: TypeSocketMessages.error,
                        content: FailureHelper.mapFailureToMessage(failure)
                    });
                    resolve(false);
                });
            });
            converter.leftMap((failure) => {
                serverResponse = new CustomMessage({
                    type: TypeSocketMessages.error,
                    content: (failure as ValidationFailure).message!,
                });
                resolve(false);
            });
        });

        return serverResponse;
    }
}