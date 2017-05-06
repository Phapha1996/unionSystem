package glut.db.auto;

import java.util.HashSet;
import java.util.Set;

/**
 * ActivityGroup entity. @author MyEclipse Persistence Tools
 */

public class ActivityGroup implements java.io.Serializable {

	// Fields

	private Integer id;
	private String groupName;
	private Integer applyLimit;
	private Set activities = new HashSet(0);

	// Constructors

	/** default constructor */
	public ActivityGroup() {
	}

	/** full constructor */
	public ActivityGroup(String groupName, Integer applyLimit, Set activities) {
		this.groupName = groupName;
		this.applyLimit = applyLimit;
		this.activities = activities;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getGroupName() {
		return this.groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public Integer getApplyLimit() {
		return this.applyLimit;
	}

	public void setApplyLimit(Integer applyLimit) {
		this.applyLimit = applyLimit;
	}

	public Set getActivities() {
		return this.activities;
	}

	public void setActivities(Set activities) {
		this.activities = activities;
	}

}