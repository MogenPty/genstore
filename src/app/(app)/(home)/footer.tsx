export const Footer = () => {
	return (
        <footer className="flex border-t justify-center font-medium p-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} genstore. All rights reserved.
            </p>
          </div>
        </footer>			<div className="flex items-center gap-2">
				<p className="text-sm text-gray-600">
					&copy; {new Date().getFullYear()} genstore. All rights reserved.
				</p>
			</div>
		</footer>
	);
};
