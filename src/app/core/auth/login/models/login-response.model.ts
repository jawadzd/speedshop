//login response model to hold the login response data
export interface ILoginResponse {
    Login: {
        AccessToken:      string;
        ExpiresIn:        number;
        RefreshExpiresIn: number;
        RefreshToken:     string;
        TokenType:        string;
        NotBeforePolicy:  number;
        SessionState:     string;
        Scope:            string;
    }
}