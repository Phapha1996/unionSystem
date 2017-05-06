package glut.db.auto;

/**
 * DpmUnion entity. @author MyEclipse Persistence Tools
 */

public class DpmUnion implements java.io.Serializable {

	// Fields

	private Integer id;
	private String dpmBrief;
	private String subUnion;

	// Constructors

	/** default constructor */
	public DpmUnion() {
	}

	/** full constructor */
	public DpmUnion(String dpmBrief, String subUnion) {
		this.dpmBrief = dpmBrief;
		this.subUnion = subUnion;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
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

}