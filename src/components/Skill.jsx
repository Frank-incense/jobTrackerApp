function Skills({skill, updateSkill, addSkill}) {

    return (
        <div className="skills-section">
            <input 
            type="text" 
            id="skill" 
            name="skill" 
            placeholder="Enter your skill" 
            value={skill}
            onChange={(e) => updateSkill(e.target.value)}
            />
            <button 
            type="button" 
            className="add-skill-btn"
            onClick={addSkill}
            >
                Add Skill
            </button>
        </div>
    )
}

export default Skills;