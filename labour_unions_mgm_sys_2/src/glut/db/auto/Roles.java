package glut.db.auto;

import java.util.HashSet;
import java.util.Set;

/**
 * Roles entity. @author MyEclipse Persistence Tools
 */

public class Roles implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer enable;
	private String name;
	private Set usersRoleses = new HashSet(0);
	private Set rolesResourceses = new HashSet(0);

	// Constructors

	/** default constructor */
	public Roles() {
	}

	/** full constructor */
	public Roles(Integer enable, String name, Set usersRoleses,
			Set rolesResourceses) {
		this.enable = enable;
		this.name = name;
		this.usersRoleses = usersRoleses;
		this.rolesResourceses = rolesResourceses;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
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

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set getUsersRoleses() {
		return this.usersRoleses;
	}

	public void setUsersRoleses(Set usersRoleses) {
		this.usersRoleses = usersRoleses;
	}

	public Set getRolesResourceses() {
		return this.rolesResourceses;
	}

	public void setRolesResourceses(Set rolesResourceses) {
		this.rolesResourceses = rolesResourceses;
	}

}