import { NoneFoundView } from "@/core/shared_components/none_found_view";

export default function Home() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <NoneFoundView
                label="Nothing to show here..."
                body="Moved pretty much all of the functionality to the admin page for now."
            />
        </div>
    );
}
