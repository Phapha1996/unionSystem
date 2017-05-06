package glut.db.auto;

import java.util.HashSet;
import java.util.Set;

/**
 * Member entity. @author MyEclipse Persistence Tools
 */

public class Member implements java.io.Serializable {

	// Fields

	private String number;
	private String name;
	private String idCard;
	private String employType;
	private String joinCondition;
	private String dpmBrief;
	private String subUnion;
	private String dpmDetail;
	private String duty;
	private String takeOfferDate;
	private String level;
	private String reachLevelDate;
	private String native_;
	private String sex;
	private String nationality;
	private String birthday;
	private String topEducation;
	private String topDegree;
	private String politics;
	private String joinDate;
	private String workDate;
	private String title;
	private String titleLevel;
	private String firstEmpJob;
	private String firstEmpJobType;
	private String graduateSch;
	private String topEduDate;
	private String topDegreeDate;
	private String major;
	private String subject;
	private String joinSchDate;
	private Set users = new HashSet(0);
	private Set activitySignUps = new HashSet(0);
	private Set cmtMbAdv4Proposals = new HashSet(0);

	// Constructors

	/** default constructor */
	public Member() {
	}

	/** minimal constructor */
	public Member(String number) {
		this.number = number;
	}

	/** full constructor */
	public Member(String number, String name, String idCard, String employType,
			String joinCondition, String dpmBrief, String subUnion,
			String dpmDetail, String duty, String takeOfferDate, String level,
			String reachLevelDate, String native_, String sex,
			String nationality, String birthday, String topEducation,
			String topDegree, String politics, String joinDate,
			String workDate, String title, String titleLevel,
			String firstEmpJob, String firstEmpJobType, String graduateSch,
			String topEduDate, String topDegreeDate, String major,
			String subject, String joinSchDate, Set userses,
			Set activitySignUps, Set cmtMbAdv4Proposals) {
		this.number = number;
		this.name = name;
		this.idCard = idCard;
		this.employType = employType;
		this.joinCondition = joinCondition;
		this.dpmBrief = dpmBrief;
		this.subUnion = subUnion;
		this.dpmDetail = dpmDetail;
		this.duty = duty;
		this.takeOfferDate = takeOfferDate;
		this.level = level;
		this.reachLevelDate = reachLevelDate;
		this.native_ = native_;
		this.sex = sex;
		this.nationality = nationality;
		this.birthday = birthday;
		this.topEducation = topEducation;
		this.topDegree = topDegree;
		this.politics = politics;
		this.joinDate = joinDate;
		this.workDate = workDate;
		this.title = title;
		this.titleLevel = titleLevel;
		this.firstEmpJob = firstEmpJob;
		this.firstEmpJobType = firstEmpJobType;
		this.graduateSch = graduateSch;
		this.topEduDate = topEduDate;
		this.topDegreeDate = topDegreeDate;
		this.major = major;
		this.subject = subject;
		this.joinSchDate = joinSchDate;
		this.users = users;
		this.activitySignUps = activitySignUps;
		this.cmtMbAdv4Proposals = cmtMbAdv4Proposals;
	}

	// Property accessors

	public String getNumber() {
		return this.number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdCard() {
		return this.idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getEmployType() {
		return this.employType;
	}

	public void setEmployType(String employType) {
		this.employType = employType;
	}

	public String getJoinCondition() {
		return this.joinCondition;
	}

	public void setJoinCondition(String joinCondition) {
		this.joinCondition = joinCondition;
	}

	public String getDpmBrief() {
		return this.dpmBrief;
	}

	public void setDpmBrief(String dpmBrief) {
		this.dpmBrief = dpmBrief;
	}

	public String getSubUnion() {
		return this.subUnion;
	}

	public void setSubUnion(String subUnion) {
		this.subUnion = subUnion;
	}

	public String getDpmDetail() {
		return this.dpmDetail;
	}

	public void setDpmDetail(String dpmDetail) {
		this.dpmDetail = dpmDetail;
	}

	public String getDuty() {
		return this.duty;
	}

	public void setDuty(String duty) {
		this.duty = duty;
	}

	public String getTakeOfferDate() {
		return this.takeOfferDate;
	}

	public void setTakeOfferDate(String takeOfferDate) {
		this.takeOfferDate = takeOfferDate;
	}

	public String getLevel() {
		return this.level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getReachLevelDate() {
		return this.reachLevelDate;
	}

	public void setReachLevelDate(String reachLevelDate) {
		this.reachLevelDate = reachLevelDate;
	}

	public String getNative_() {
		return this.native_;
	}

	public void setNative_(String native_) {
		this.native_ = native_;
	}

	public String getSex() {
		return this.sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getNationality() {
		return this.nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getBirthday() {
		return this.birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getTopEducation() {
		return this.topEducation;
	}

	public void setTopEducation(String topEducation) {
		this.topEducation = topEducation;
	}

	public String getTopDegree() {
		return this.topDegree;
	}

	public void setTopDegree(String topDegree) {
		this.topDegree = topDegree;
	}

	public String getPolitics() {
		return this.politics;
	}

	public void setPolitics(String politics) {
		this.politics = politics;
	}

	public String getJoinDate() {
		return this.joinDate;
	}

	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}

	public String getWorkDate() {
		return this.workDate;
	}

	public void setWorkDate(String workDate) {
		this.workDate = workDate;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitleLevel() {
		return this.titleLevel;
	}

	public void setTitleLevel(String titleLevel) {
		this.titleLevel = titleLevel;
	}

	public String getFirstEmpJob() {
		return this.firstEmpJob;
	}

	public void setFirstEmpJob(String firstEmpJob) {
		this.firstEmpJob = firstEmpJob;
	}

	public String getFirstEmpJobType() {
		return this.firstEmpJobType;
	}

	public void setFirstEmpJobType(String firstEmpJobType) {
		this.firstEmpJobType = firstEmpJobType;
	}

	public String getGraduateSch() {
		return this.graduateSch;
	}

	public void setGraduateSch(String graduateSch) {
		this.graduateSch = graduateSch;
	}

	public String getTopEduDate() {
		return this.topEduDate;
	}

	public void setTopEduDate(String topEduDate) {
		this.topEduDate = topEduDate;
	}

	public String getTopDegreeDate() {
		return this.topDegreeDate;
	}

	public void setTopDegreeDate(String topDegreeDate) {
		this.topDegreeDate = topDegreeDate;
	}

	public String getMajor() {
		return this.major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getSubject() {
		return this.subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getJoinSchDate() {
		return this.joinSchDate;
	}

	public void setJoinSchDate(String joinSchDate) {
		this.joinSchDate = joinSchDate;
	}

	public Set getUsers() {
		return this.users;
	}

	public void setUsers(Set users) {
		this.users = users;
	}

	public Set getActivitySignUps() {
		return this.activitySignUps;
	}

	public void setActivitySignUps(Set activitySignUps) {
		this.activitySignUps = activitySignUps;
	}

	public Set getCmtMbAdv4Proposals() {
		return this.cmtMbAdv4Proposals;
	}

	public void setCmtMbAdv4Proposals(Set cmtMbAdv4Proposals) {
		this.cmtMbAdv4Proposals = cmtMbAdv4Proposals;
	}

}