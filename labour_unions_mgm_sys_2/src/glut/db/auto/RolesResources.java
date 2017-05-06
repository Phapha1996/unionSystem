package glut.db.auto;

/**
 * RolesResources entity. @author MyEclipse Persistence Tools
 */

public class RolesResources implements java.io.Serializable {

	// Fields

	private Integer rrId;
	private Roles roles;
	private Resources resources;

	// Constructors

	/** default constructor */
	public RolesResources() {
	}

	/** full constructor */
	public RolesResources(Roles roles, Resources resources) {
		this.roles = roles;
		this.resources = resources;
	}

	// Property accessors

	public Integer getRrId() {
		return this.rrId;
	}

	public void setRrId(Integer rrId) {
		this.rrId = rrId;
	}

	public Roles getRoles() {
		return this.roles;
	}

	public void setRoles(Roles roles) {
		this.roles = roles;
	}

	public Resources getResources() {
		return this.resources;
	}

	public void setResources(Resources resources) {
		this.resources = resources;
	}

}