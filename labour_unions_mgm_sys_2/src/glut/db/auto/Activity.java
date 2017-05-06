package glut.db.auto;

import java.sql.Time;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Activity entity. @author MyEclipse Persistence Tools
 */

public class Activity implements java.io.Serializable {

	// Fields

	private String id;
	private ActivityGroup activityGroup;
	private String name;
	private String object;
	private Date deadLine;
	private Date activityTime;
	private String notes;
	private String status;
	private Integer populationLimit;
	private String activityType;
	private Integer populationCurrent;
	private String template;
	private Time actTime;
	private String actLocation;
	private String actCustomtime;
	private Set activitySignUps = new HashSet(0);

	// Constructors

	/** default constructor */
	public Activity() {
	}

	/** minimal constructor */
	public Activity(String id) {
		this.id = id;
	}

	/** full constructor */
	public Activity(String id, ActivityGroup activityGroup, String name,
			String object, Date deadLine, Date activityTime, String notes,
			String status, Integer populationLimit, String activityType,
			Integer populationCurrent, String template, Time actTime,
			String actLocation, String actCustomtime, Set activitySignUps) {
		this.id = id;
		this.activityGroup = activityGroup;
		this.name = name;
		this.object = object;
		this.deadLine = deadLine;
		this.activityTime = activityTime;
		this.notes = notes;
		this.status = status;
		this.populationLimit = populationLimit;
		this.activityType = activityType;
		this.populationCurrent = populationCurrent;
		this.template = template;
		this.actTime = actTime;
		this.actLocation = actLocation;
		this.actCustomtime = actCustomtime;
		this.activitySignUps = activitySignUps;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ActivityGroup getActivityGroup() {
		return this.activityGroup;
	}

	public void setActivityGroup(ActivityGroup activityGroup) {
		this.activityGroup = activityGroup;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getObject() {
		return this.object;
	}

	public void setObject(String object) {
		this.object = object;
	}

	public Date getDeadLine() {
		return this.deadLine;
	}

	public void setDeadLine(Date deadLine) {
		this.deadLine = deadLine;
	}

	public Date getActivityTime() {
		return this.activityTime;
	}

	public void setActivityTime(Date activityTime) {
		this.activityTime = activityTime;
	}

	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getPopulationLimit() {
		return this.populationLimit;
	}

	public void setPopulationLimit(Integer populationLimit) {
		this.populationLimit = populationLimit;
	}

	public String getActivityType() {
		return this.activityType;
	}

	public void setActivityType(String activityType) {
		this.activityType = activityType;
	}

	public Integer getPopulationCurrent() {
		return this.populationCurrent;
	}

	public void setPopulationCurrent(Integer populationCurrent) {
		this.populationCurrent = populationCurrent;
	}

	public String getTemplate() {
		return this.template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public Time getActTime() {
		return this.actTime;
	}

	public void setActTime(Time actTime) {
		this.actTime = actTime;
	}

	public String getActLocation() {
		return this.actLocation;
	}

	public void setActLocation(String actLocation) {
		this.actLocation = actLocation;
	}

	public String getActCustomtime() {
		return this.actCustomtime;
	}

	public void setActCustomtime(String actCustomtime) {
		this.actCustomtime = actCustomtime;
	}

	public Set getActivitySignUps() {
		return this.activitySignUps;
	}

	public void setActivitySignUps(Set activitySignUps) {
		this.activitySignUps = activitySignUps;
	}

}