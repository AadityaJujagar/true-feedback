export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/40 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} True Feedback. All rights reserved.
      </div>
    </footer>
  );
};
