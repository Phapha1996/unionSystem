package glut.security.bean;

import glut.db.auto.Member;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;


/**
 * Users entity. @author MyEclipse Persistence Tools
 */

public class Users implements java.io.Serializable {

	// Fields    

	private Integer id;
	private Integer enable;
	private String password;
	//private String account;
	private Set usersRoleses = new HashSet(0);

	//member表的字段
	private Member member;
	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	private String name;
	private String sex;
	private String idCard;
	private String dpmBrief;
	private String birthday;

	//roles表的字段
	private String roleName;
	private Integer roleId;

	// Constructors
	/** minimal constructor */
	public Users(Member member) {
		this.member=member;
	}

	public String getName() {
		return this.getMember().getName();
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return this.getMember().getSex();
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getIdCard() {
		return this.getMember().getIdCard();
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getDpmBrief() {
		return this.getMember().getDpmBrief();
	}

	public void setDpmBrief(String dpmBrief) {
		this.dpmBrief = dpmBrief;
	}

	public String getBirthday() {
		return this.getMember().getBirthday();
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	/** default constructor */
	public Users() {
	}

	/** 用来构造与member表的联合查询结果 */
	public Users(String password, Member member, String roleName, Integer roleId) {
		setMember(member);
		setPassword(password);
		this.setRoleName(roleName);
		this.setRoleId(roleId);
	}

	/** full constructor */
	public Users(Integer enable, String password, Member member,
			Set usersRoleses) {
		this.enable = enable;
		this.password = password;
		this.member = member;
		this.usersRoleses = usersRoleses;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	//custom constructor made by leo
	public Users(String password, Member member, String name, String sex,
			String idCard, String dpmBrief, String birthday, String roleName,
			Integer roleId) {
		super();
		this.password = password;
		this.member = member;
		this.name = name;
		this.sex = sex;
		this.idCard = idCard;
		this.dpmBrief = dpmBrief;
		this.birthday = birthday;
		this.roleName = roleName;
		this.roleId = roleId;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getEnable() {
		return this.enable;
	}

	public void setEnable(Integer enable) {
		this.enable = enable;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public Set getUsersRoleses() {
		return this.usersRoleses;
	}

	public void setUsersRoleses(Set usersRoleses) {
		this.usersRoleses = usersRoleses;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	@Override
	public String toString() {
		return "Users [id=" + id + ", enable=" + enable + ", password="
				+ password + ", account=" + getMember().getNumber() + ", name=" + name
				+ ", sex=" + sex + ", idCard=" + idCard + ", dpmBrief="
				+ dpmBrief + ", birthday=" + birthday + "]";
	}
	
	//获取员工编号
	public String getAccount(){
		return this.getMember().getNumber();
	}

}