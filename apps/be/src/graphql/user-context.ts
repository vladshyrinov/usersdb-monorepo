import { UserDataSource } from "./datasources/user-datasource"

export interface UserContext {
    dataSources: {
        users: UserDataSource
    }
}