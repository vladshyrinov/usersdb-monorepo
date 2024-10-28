import { useQuery } from "@apollo/client";
import { GET_USERS } from "../queries";

type User = {
  name: string;
  email: string;
};

type UsersResponse = {
  users: User[];
};

export function Users() {
  const { loading, error, data } = useQuery<UsersResponse>(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data ? (
    data.users.map(({ email, name }) => (
      <div key={email}>
        <h3>{name}</h3>
        <p>{email}</p>
        <br />
      </div>
    ))
  ) : (
    <h3>No users available</h3>
  );
}
