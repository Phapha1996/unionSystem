package glut.db.auto;

import java.util.HashSet;
import java.util.Set;

/**
 * Users entity. @author MyEclipse Persistence Tools
 */

public class Users implements java.io.Serializable {

	// Fields

	private Integer id;
	private Member member;
	private Integer enable;
	private String password;
	private Set usersRoleses = new HashSet(0);

	// Constructors

	/** default constructor */
	public Users() {
	}

	/** full constructor */
	public Users(Member member, Integer enable, String password,
			Set usersRoleses) {
		this.member = member;
		this.enable = enable;
		this.password = password;
		this.usersRoleses = usersRoleses;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Member getMember() {
		return this.member;
	}

	public void setMember(Member member) {
		this.member = member;
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

}