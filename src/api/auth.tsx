import connection from ".";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const loginAPI = async (body: LoginRequest): Promise<LoginResponse> => {
  const response = await connection.post<LoginResponse>("/api/login", body);
  return response.data;
};