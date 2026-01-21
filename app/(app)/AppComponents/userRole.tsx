import { getUserWithRole } from '@/lib/actions/userAction';


export default async function UserRole() {
    
const { role, isSetupDone } = await getUserWithRole();
  return (
    <div>{role}</div>
  )
}
