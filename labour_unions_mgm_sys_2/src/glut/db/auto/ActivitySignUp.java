package glut.db.auto;

/**
 * ActivitySignUp entity. @author MyEclipse Persistence Tools
 */

public class ActivitySignUp implements java.io.Serializable {

	// Fields

	private Integer id;
	private Member member;
	private Activity activity;
	private String playerPhone;
	private String notes;
	private String result;
	private String signupDoc;

	// Constructors

	/** default constructor */
	public ActivitySignUp() {
	}

	/** full constructor */
	public ActivitySignUp(Member member, Activity activity, String playerPhone,
			String notes, String result, String signupDoc) {
		this.member = member;
		this.activity = activity;
		this.playerPhone = playerPhone;
		this.notes = notes;
		this.result = result;
		this.signupDoc = signupDoc;
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

	public Activity getActivity() {
		return this.activity;
	}

	public void setActivity(Activity activity) {
		this.activity = activity;
	}

	public String getPlayerPhone() {
		return this.playerPhone;
	}

	public void setPlayerPhone(String playerPhone) {
		this.playerPhone = playerPhone;
	}

	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getResult() {
		return this.result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getSignupDoc() {
		return this.signupDoc;
	}

	public void setSignupDoc(String signupDoc) {
		this.signupDoc = signupDoc;
	}

}