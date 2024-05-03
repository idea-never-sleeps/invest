import { auth } from '@/lib/auth';

export default auth((req) => {
  if (!req.auth) {
    if (req.nextUrl.pathname === '/signin') return;
    if (req.nextUrl.pathname === '/') return;
    if (req.nextUrl.pathname.startsWith('/api/auth')) return;
    
    const url = req.url.replace(req.nextUrl.pathname, '/signin');
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
