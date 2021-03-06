// tslint:disable:no-string-literal
import { IAccountDetails } from "./IAccountDetails";
import { AccountType } from "app/shared/data/account/AccountType";

export class AccountDetailsReader {
    read(address: string, data: any) {
        let code = data.code;

        let account: IAccountDetails = {
            address,
            type: code && code !== "0x" ? AccountType.Contract : AccountType.External,
            accountCode: code && code !== "0x" ? code.replace(/^0x/, "") : void 0,
            contractAbi: data.contractAbi
        };
        return account;
    }
}
