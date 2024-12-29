const MessageSkeleton = () => {
	return (
		<>
		{/* Mesaj yüklenirken soldan sağa sıralanmış iskelet ekran */}
			<div className='flex gap-3 items-center'>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>	{/* Profil resmi iskeleti */}
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>	{/* Mesaj içeriği iskeleti */}
					<div className='skeleton h-4 w-40'></div>	
				</div>
			</div>

			{/* Mesaj yüklenirken sağdan sola sıralanmış iskelet ekran */}
			<div className='flex gap-3 items-center justify-end'>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>	{/* Mesaj içeriği iskeleti */}
				</div>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>	{/* Profil resmi iskeleti */}
			</div>
		</>
	);
};
export default MessageSkeleton;
