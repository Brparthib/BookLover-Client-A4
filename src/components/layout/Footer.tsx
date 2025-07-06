export default function Footer() {
  const date = new Date().getFullYear();

  return (
      <footer className="border-t border-b-gray-600 bg-background">
        <div className="flex justify-center items-center py-6">
          <p className="text-sm">
            &copy; {date} BookLover. All rights reserved.
          </p>
        </div>
      </footer>
  );
}
