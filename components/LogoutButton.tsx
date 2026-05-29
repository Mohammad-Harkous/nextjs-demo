import { logout } from '@/app/actions/auth';

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="hover:text-zinc-300 transition-colors font-medium text-sm cursor-pointer"
      >
        Sign out
      </button>
    </form>
  );
}
