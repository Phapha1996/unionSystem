package glut.db.auto;

/**
 * UsersRoles entity. @author MyEclipse Persistence Tools
 */

public class UsersRoles implements java.io.Serializable {

	// Fields

	private Integer urId;
	private Roles roles;
	private Users users;

	// Constructors

	/** default constructor */
	public UsersRoles() {
	}

	/** full constructor */
	public UsersRoles(Roles roles, Users users) {
		this.roles = roles;
		this.users = users;
	}

	// Property accessors

	public Integer getUrId() {
		return this.urId;
	}

	public void setUrId(Integer urId) {
		this.urId = urId;
	}

	public Roles getRoles() {
		return this.roles;
	}

	public void setRoles(Roles roles) {
		this.roles = roles;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

}