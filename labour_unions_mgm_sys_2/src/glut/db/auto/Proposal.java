package glut.db.auto;

import java.util.Date;

/**
 * Proposal entity. @author MyEclipse Persistence Tools
 */

public class Proposal implements java.io.Serializable {

	// Fields

	private String id;
	private String submitterName;
	private String submitterDpm;
	private Date submitDate;
	private String submitterPhone;
	private String supporter1;
	private String supporter2;
	private String category;
	private String title;
	private String reason;
	private String action;
	private String committeeAdv;
	private String relevantDpm;
	private String progress;
	private String replyContent;
	private String memo;
	private Integer nextUnit;
	private String comment;
	private String feedback;
	private String mainUnit;
	private String assistantUnit;
	private String dpmReply;
	private String responseLeader;
	private String ldOpinion;
	private String ldOpinionFlag;
	private String dpmReplyFlag;
	private String dlgReplyFlag;

	// Constructors

	/** default constructor */
	public Proposal() {
	}

	/** minimal constructor */
	public Proposal(String id) {
		this.id = id;
	}

	/** full constructor */
	public Proposal(String id, String submitterName, String submitterDpm,
			Date submitDate, String submitterPhone, String supporter1,
			String supporter2, String category, String title, String reason,
			String action, String committeeAdv, String relevantDpm,
			String progress, String replyContent, String memo,
			Integer nextUnit, String comment, String feedback, String mainUnit,
			String assistantUnit, String dpmReply, String responseLeader,
			String ldOpinion, String ldOpinionFlag, String dpmReplyFlag,
			String dlgReplyFlag) {
		this.id = id;
		this.submitterName = submitterName;
		this.submitterDpm = submitterDpm;
		this.submitDate = submitDate;
		this.submitterPhone = submitterPhone;
		this.supporter1 = supporter1;
		this.supporter2 = supporter2;
		this.category = category;
		this.title = title;
		this.reason = reason;
		this.action = action;
		this.committeeAdv = committeeAdv;
		this.relevantDpm = relevantDpm;
		this.progress = progress;
		this.replyContent = replyContent;
		this.memo = memo;
		this.nextUnit = nextUnit;
		this.comment = comment;
		this.feedback = feedback;
		this.mainUnit = mainUnit;
		this.assistantUnit = assistantUnit;
		this.dpmReply = dpmReply;
		this.responseLeader = responseLeader;
		this.ldOpinion = ldOpinion;
		this.ldOpinionFlag = ldOpinionFlag;
		this.dpmReplyFlag = dpmReplyFlag;
		this.dlgReplyFlag = dlgReplyFlag;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSubmitterName() {
		return this.submitterName;
	}

	public void setSubmitterName(String submitterName) {
		this.submitterName = submitterName;
	}

	public String getSubmitterDpm() {
		return this.submitterDpm;
	}

	public void setSubmitterDpm(String submitterDpm) {
		this.submitterDpm = submitterDpm;
	}

	public Date getSubmitDate() {
		return this.submitDate;
	}

	public void setSubmitDate(Date submitDate) {
		this.submitDate = submitDate;
	}

	public String getSubmitterPhone() {
		return this.submitterPhone;
	}

	public void setSubmitterPhone(String submitterPhone) {
		this.submitterPhone = submitterPhone;
	}

	public String getSupporter1() {
		return this.supporter1;
	}

	public void setSupporter1(String supporter1) {
		this.supporter1 = supporter1;
	}

	public String getSupporter2() {
		return this.supporter2;
	}

	public void setSupporter2(String supporter2) {
		this.supporter2 = supporter2;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getReason() {
		return this.reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getAction() {
		return this.action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getCommitteeAdv() {
		return this.committeeAdv;
	}

	public void setCommitteeAdv(String committeeAdv) {
		this.committeeAdv = committeeAdv;
	}

	public String getRelevantDpm() {
		return this.relevantDpm;
	}

	public void setRelevantDpm(String relevantDpm) {
		this.relevantDpm = relevantDpm;
	}

	public String getProgress() {
		return this.progress;
	}

	public void setProgress(String progress) {
		this.progress = progress;
	}

	public String getReplyContent() {
		return this.replyContent;
	}

	public void setReplyContent(String replyContent) {
		this.replyContent = replyContent;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public Integer getNextUnit() {
		return this.nextUnit;
	}

	public void setNextUnit(Integer nextUnit) {
		this.nextUnit = nextUnit;
	}

	public String getComment() {
		return this.comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getFeedback() {
		return this.feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public String getMainUnit() {
		return this.mainUnit;
	}

	public void setMainUnit(String mainUnit) {
		this.mainUnit = mainUnit;
	}

	public String getAssistantUnit() {
		return this.assistantUnit;
	}

	public void setAssistantUnit(String assistantUnit) {
		this.assistantUnit = assistantUnit;
	}

	public String getDpmReply() {
		return this.dpmReply;
	}

	public void setDpmReply(String dpmReply) {
		this.dpmReply = dpmReply;
	}

	public String getResponseLeader() {
		return this.responseLeader;
	}

	public void setResponseLeader(String responseLeader) {
		this.responseLeader = responseLeader;
	}

	public String getLdOpinion() {
		return this.ldOpinion;
	}

	public void setLdOpinion(String ldOpinion) {
		this.ldOpinion = ldOpinion;
	}

	public String getLdOpinionFlag() {
		return this.ldOpinionFlag;
	}

	public void setLdOpinionFlag(String ldOpinionFlag) {
		this.ldOpinionFlag = ldOpinionFlag;
	}

	public String getDpmReplyFlag() {
		return this.dpmReplyFlag;
	}

	public void setDpmReplyFlag(String dpmReplyFlag) {
		this.dpmReplyFlag = dpmReplyFlag;
	}

	public String getDlgReplyFlag() {
		return this.dlgReplyFlag;
	}

	public void setDlgReplyFlag(String dlgReplyFlag) {
		this.dlgReplyFlag = dlgReplyFlag;
	}

}