
import { prismaClient } from "db/client"



export default async function Home() {
  const users= await prismaClient.user.findMany();
  return (
    <div>
      {users.map(user => <div key={user.id}>name= {user.username} password= {user.password} </div>)}
    </div>
  );
}
