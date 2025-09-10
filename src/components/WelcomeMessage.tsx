type WelcomeMessageProps = {
  isAuthenticated?: boolean;
  username?: string;
};

export default function WelcomeMessage({ isAuthenticated = false, username }: WelcomeMessageProps) {
  return (
    <div className="text-center">
      {!isAuthenticated ? (
        <h1 className="text-4xl mb-4 font-bold">Welcome!</h1>
      ) : (
        <h1 className="text-3xl mb-4 font-semibold">Welcome Back, {username}!</h1>
      )}
    </div>
  );
}
