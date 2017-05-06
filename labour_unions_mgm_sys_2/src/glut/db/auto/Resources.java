package glut.db.auto;

import java.util.HashSet;
import java.util.Set;

/**
 * Resources entity. @author MyEclipse Persistence Tools
 */

public class Resources implements java.io.Serializable {

	// Fields

	private Integer id;
	private String memo;
	private String url;
	private Integer priority;
	private Integer type;
	private String name;
	private Set rolesResourceses = new HashSet(0);

	// Constructors

	/** default constructor */
	public Resources() {
	}

	/** full constructor */
	public Resources(String memo, String url, Integer priority, Integer type,
			String name, Set rolesResourceses) {
		this.memo = memo;
		this.url = url;
		this.priority = priority;
		this.type = type;
		this.name = name;
		this.rolesResourceses = rolesResourceses;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getPriority() {
		return this.priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set getRolesResourceses() {
		return this.rolesResourceses;
	}

	public void setRolesResourceses(Set rolesResourceses) {
		this.rolesResourceses = rolesResourceses;
	}

}