import MessageContainer from "../../components/messages/MessageContainer";	// Mesaj konteyneri bileşeni.
import Sidebar from "../../components/sidebar/Sidebar";						// Yan panel bileşeni.

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />	 {/* Yan panel */}
			<MessageContainer />	{/* Mesaj konteyneri */}
		</div>
	);
};
export default Home;
