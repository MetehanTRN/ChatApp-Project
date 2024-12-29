const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className='flex'>	{/* Kapsayıcı div, checkboxları yatay olarak düzenler. */}
			<div className='form-control'>
				{/* Erkek seçeneği */}
				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
					<span className='label-text'>Male</span>	{/* Erkek etiketi */}
					<input
						type='checkbox'	// Checkbox türünde giriş alanı.
						className='checkbox border-slate-900'	
						checked={selectedGender === "male"}				// Erkek seçiliyse işaretli olur.
						onChange={() => onCheckboxChange("male")}		// Erkek seçildiğinde olay işleyici çağrılır.
					/>
				</label>
			</div>
			<div className='form-control'>
				{/* Kadın seçeneği */}
				<label className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>
					<span className='label-text'>Female</span>	{/* Kadın etiketi */}
					<input
						type='checkbox'	// Checkbox türünde giriş alanı.
						className='checkbox border-slate-900'
						checked={selectedGender === "female"}			// Kadın seçiliyse işaretli olur.
						onChange={() => onCheckboxChange("female")}		// Kadın seçildiğinde olay işleyici çağrılır.
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;