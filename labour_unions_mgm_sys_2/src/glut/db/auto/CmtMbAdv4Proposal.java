package glut.db.auto;

/**
 * CmtMbAdv4Proposal entity. @author MyEclipse Persistence Tools
 */

public class CmtMbAdv4Proposal implements java.io.Serializable {

	// Fields

	private Integer id;
	private Member member;
	private String cmtMbAdv;
	private String cmtMbAdvDpm1st;
	private String cmtMbAdvDpm2nd;
	private String proposalId;

	// Constructors

	/** default constructor */
	public CmtMbAdv4Proposal() {
	}

	/** full constructor */
	public CmtMbAdv4Proposal(Member member, String cmtMbAdv,
			String cmtMbAdvDpm1st, String cmtMbAdvDpm2nd, String proposalId) {
		this.member = member;
		this.cmtMbAdv = cmtMbAdv;
		this.cmtMbAdvDpm1st = cmtMbAdvDpm1st;
		this.cmtMbAdvDpm2nd = cmtMbAdvDpm2nd;
		this.proposalId = proposalId;
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

	public String getCmtMbAdv() {
		return this.cmtMbAdv;
	}

	public void setCmtMbAdv(String cmtMbAdv) {
		this.cmtMbAdv = cmtMbAdv;
	}

	public String getCmtMbAdvDpm1st() {
		return this.cmtMbAdvDpm1st;
	}

	public void setCmtMbAdvDpm1st(String cmtMbAdvDpm1st) {
		this.cmtMbAdvDpm1st = cmtMbAdvDpm1st;
	}

	public String getCmtMbAdvDpm2nd() {
		return this.cmtMbAdvDpm2nd;
	}

	public void setCmtMbAdvDpm2nd(String cmtMbAdvDpm2nd) {
		this.cmtMbAdvDpm2nd = cmtMbAdvDpm2nd;
	}

	public String getProposalId() {
		return this.proposalId;
	}

	public void setProposalId(String proposalId) {
		this.proposalId = proposalId;
	}

}