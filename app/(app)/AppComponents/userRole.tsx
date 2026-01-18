import { getUserWithRole } from '@/lib/actions/getUserWithRole';


export default async function UserRole() {
    
const { role, isSetupDone } = await getUserWithRole();
  return (
    <div>{role}</div>
  )
}
