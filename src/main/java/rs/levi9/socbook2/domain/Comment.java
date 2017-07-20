package rs.levi9.socbook2.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "comment")
public class Comment extends BaseEntity {

	private BookmarkUser bookmarkUser;
	private Bookmark bookmark;
	private String commentContent;
	private Date createdAt;
	
	public Comment() {}
	
	public Comment(BookmarkUser bookmarkUser, Bookmark bookmark, String commentContent, Date createdAt) {
		this.bookmarkUser = bookmarkUser;
		this.bookmark = bookmark;
		this.commentContent = commentContent;
		this.createdAt = createdAt;
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

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	
	
}
