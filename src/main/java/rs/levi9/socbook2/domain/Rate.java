package rs.levi9.socbook2.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "rate")
public class Rate extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 453451243910264188L;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private BookmarkUser bookmarkUser; 
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "bookmark_id", nullable = false)
	private Bookmark bookmark;
	
	@Column(nullable = false)
	@NotNull	
	private Integer rateMark;
	
	@Column(nullable = false)
	@NotNull	
	private Date createdDate;
	
	public Rate() {}

	public Rate(BookmarkUser bookmarkUser, Bookmark bookmark, Integer rateMark, Date createdDate) {
		super();
		this.bookmarkUser = bookmarkUser;
		this.bookmark = bookmark;
		this.rateMark = rateMark;
		this.createdDate = createdDate;
	}

	public BookmarkUser getBookmarkUser() {
		return bookmarkUser;
	}

	public void setBookmarkUser(BookmarkUser bookmarkUser) {
		this.bookmarkUser = bookmarkUser;
	}

	public Bookmark getBookmark() {
		return bookmark;
	}

	public void setBookmark(Bookmark bookmark) {
		this.bookmark = bookmark;
	}

	public Integer getRateMark() {
		return rateMark;
	}

	public void setRateMark(Integer rateMark) {
		this.rateMark = rateMark;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}	
}