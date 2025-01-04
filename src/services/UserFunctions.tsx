import useAxios from "../interceptors/AxiosInstance.tsx";
import React, {createContext, ReactNode, useContext} from "react";
import {useAuth} from "../context/AuthContext.tsx";

export interface user {
    id: string,
    username: string,
    email: string,
    enabled: boolean
}

export interface userUpdate {
    id: string | undefined;
    username: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    country?: string;
    city?: string;
    postalCode?: string;
    address?: string;
    profilePicture?: string;
    email?: string;
    enabled?: boolean;
  }
  

export interface favorite {
    id: string,
    userId: string,
    restaurantId: string,
    favoritedAt: Date
}

export interface userInfo {
    id: string;
    username: string;
    email: string;
    enabled: boolean;
    userDetails: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      country: string;
      city: string;
      postalCode: string;
      address: string;
    };
  }
  

interface UserActionsContextProps {
    handleFetchUser: (userId: string) => Promise<user | undefined>;
    handleFetchFavorites: (userId: string) => Promise<favorite[] | undefined>;
    handleAddFavorite: (userId: string, restaurantId: string) => Promise<void>;
    handleRemoveFavorite: (userId: string, restaurantId: string) => Promise<void>;
    handleUpdateUser: (userData: userUpdate) => Promise<void>;
    handleFetchUserInfo: (userId: string) => Promise<userInfo | undefined>;
    handleRemoveUser: (userId: string) => Promise<void>;
    handleUpdateUserPicture: (userId: string, image: File) => Promise<string | undefined>;
    handleGetUserPicture: (userId: string) => Promise<string | undefined>;
    handleFetchAllUsers: () => Promise<user[] | undefined>;
}

interface UserActionsProviderProps {
    children: ReactNode;
}

const UserActionsContext = createContext<UserActionsContextProps |null>(null);

export const useUserActions = () => {
    const context = useContext(UserActionsContext);
    if (!context) {
        throw new Error("useUserActions must be used within UserActionsProvider");
    }
    return context;
}

export const UserActionsProvider: React.FC<UserActionsProviderProps> = ({ children })=> {
    const {logout} = useAuth()

    const handleFetchUser = async (userId: string): Promise<user | undefined> => {
        try{
            const response =await useAxios().get("/users/"+ userId )
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const handleFetchFavorites = async (userId: string): Promise<favorite[] | undefined> => {
        try {
            const response = await useAxios().get(`users/${userId}/favorites`)
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }

        } catch (err) {
            console.error(err);
        }
    }
    const handleAddFavorite = async (userId: string, restaurantId: string): Promise<void> => {
        try {
            const response = await useAxios().post(`/users/${userId}/favorites/${restaurantId}`);
            if (response.status === 201) {
                console.log("Restaurant added to favorites");
            }
            else if (response.status === 401) {
                logout()
            }
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleRemoveFavorite = async (userId: string, restaurantId: string): Promise<void> => {
        try {
            const response = await useAxios().delete(`/users/${userId}/favorites/${restaurantId}`);
            if (response.status === 204) {
                console.log("Restaurant removed from favorites");
            }
            else if (response.status === 401) {
                logout()
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateUser = async (userData: userUpdate): Promise<void> => {
        try {
          // Filter out empty fields
          const payload = Object.fromEntries(
            Object.entries(userData).filter(([_, value]) => value !== "")
          );
      
          const response = await useAxios().put('/users/update', payload);
          if (response.status === 200) {
            console.log('User updated successfully');
          }
          else if (response.status === 401) {
              logout()
          }
        } catch (err) {
          console.error('Error updating user:', err);
        }
      };
      
      const handleFetchUserInfo = async (userId: string): Promise<userInfo | undefined> => {
        try {
          const response = await useAxios().get(`/users/${userId}`);
          if (response.status === 200) {
            return response.data;
          }
          else if (response.status === 401) {
              logout()
          }
        } catch (err) {
          console.error(err);
        }
      };

      const handleRemoveUser = async (userId: string): Promise<void> => {
        try {
          const response = await useAxios().delete(`/users/${userId}`);
          if (response.status === 204) {
            console.log('User deleted successfully');
          }
          else if (response.status === 401) {
              logout()
          }
        } catch (err) {
          console.error('Error deleting user:', err);
        }
        };

        const handleUpdateUserPicture = async (userId: string, image: File): Promise<string | undefined> => {
          try {
              const formData = new FormData();
              formData.append('image', image);
              
              const response = await useAxios().put(`/users/update-picture/${userId}`, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
              
              if (response.status === 200) {
                  console.log('Profile picture updated successfully');
                  return response.data; // The URL of the updated profile picture
              }
              else if (response.status === 401) {
                  logout()
              }
          } catch (err) {
              console.error('Error updating profile picture:', err);
          }
      };

      const handleGetUserPicture = async (userId: string): Promise<string | undefined> => {
        try {
            const response = await useAxios().get(`/users/getPicture/${userId}`);
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleFetchAllUsers = async (): Promise<user[] | undefined> => {
        try {
            const response = await useAxios().get('/users/getAll');
            if (response.status === 200) {
                return response.data;
            }
            else if (response.status === 401) {
                logout()
            }
        } catch (err) {
            console.error(err);
        }
    }
      

    return (
        <UserActionsContext.Provider value={{
            handleFetchUser, 
            handleFetchFavorites, 
            handleAddFavorite, 
            handleRemoveFavorite, 
            handleUpdateUser,
            handleFetchUserInfo,
            handleRemoveUser,
            handleUpdateUserPicture,
            handleGetUserPicture,
            handleFetchAllUsers
            }}>
            {children}
        </UserActionsContext.Provider>
    );
}


