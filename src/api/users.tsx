import connection from ".";

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
  
  interface FetchUsersResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
  }
  
  interface FetchUsersParams {
    page: number;
    per_page: number;
  }
  
  interface UserPayload {
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }

  interface APIResponseDetails {
    data: User;
    support?: {
      url: string;
      text: string;
    };
  }
  
  export const fetchUsersAPI = async (
    params: FetchUsersParams
  ): Promise<FetchUsersResponse> => {
    const response = await connection.get<FetchUsersResponse>(
      `/api/users`,
      { params }
    );
    return response.data;
  };
  
  export const createUserAPI = async (
    body: UserPayload
  ): Promise<User> => {
    const response = await connection.post<User>("/api/users", body);
    return response.data;
  };

  export const userDetailsAPI = async (
    user_id: number
  ): Promise<APIResponseDetails> => {
    const response = await connection.get<APIResponseDetails>(`/api/users/${user_id}`);
    return response.data;
  };
  
  export const updateUserAPI = async (
    body: UserPayload,
    userId: number
  ): Promise<User> => {
    const response = await connection.put<User>(`/api/users/${userId}`, body);
    return response.data;
  };
  
  export const deleteUserAPI = async (
    userId: number
  ): Promise<void> => {
    await connection.delete(`/api/users/${userId}`);
  };